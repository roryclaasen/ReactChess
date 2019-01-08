workflow "Build and Test on push" {
	on = "push"
	resolves = [
		"Docker build",
		"Fliter Master",
		"Release Heroku",
	]
}

action "Install Dependencies" {
	uses = "actions/npm@master"
	args = "install"
}

action "Lint Code" {
	uses = "actions/npm@master"
	needs = ["Install Dependencies"]
	args = "run lint"
}

action "Build Project" {
	uses = "actions/npm@master"
	needs = ["Lint Code"]
	args = "run build"
}

action "Docker build" {
	uses = "actions/docker/cli@master"
	args = "build -t roryclaasen/reactchess ."
	needs = ["Build Project"]
}

action "Fliter Master" {
	needs = "Docker build"
	uses = "actions/bin/filter@master"
	args = "branch master"
}

action "Filter Develop" {
	uses = "actions/bin/filter@master"
	needs = ["Docker build"]
	args = "branch develop"
}

action "Docker build" {
	uses = "actions/docker/cli@master"
	args = "build -t roryclaasen/reactchess ."
	needs = ["Filter Develop"]
}

action "Login Heroku" {
	needs = ["Docker build"]
	uses = "actions/heroku@master"
	args = "container:login"
	secrets = ["HEROKU_API_KEY"]
}

action "Push Heroku" {
	uses = "actions/heroku@master"
	needs = "Login Heroku"
	args = "container:push -a react-chessgame web"
	secrets = ["HEROKU_API_KEY"]
}

action "Release Heroku" {
	uses = "actions/heroku@master"
	needs = "Push Heroku"
	args = "container:release -a react-chessgame web"
	secrets = ["HEROKU_API_KEY"]
}
