workflow "Develop Test, Build and Deploy" {
	on = "push"
	resolves = [
		"Docker build",
		"Release Heroku Develop",
	]
}

action "Install Dependencies" {
	uses = "actions/npm@master"
	args = "install"
}

action "Lint Code" {
	needs = ["Install Dependencies"]
	uses = "actions/npm@master"
	args = "run lint"
}

action "Build Project" {
	needs = ["Lint Code"]
	uses = "actions/npm@master"
	args = "run build"
}

action "Docker build" {
	needs = ["Build Project"]
	uses = "actions/docker/cli@master"
	args = "build -t roryclaasen/reactchess ."
}

action "Filter Develop" {
	needs = ["Login Heroku"]
	uses = "actions/bin/filter@master"
	args = "branch develop"
}

action "Login Heroku" {
	needs = ["Filter Develop"]
	uses = "actions/heroku@master"
	args = "container:login"
	secrets = ["HEROKU_API_KEY"]
}

action "Push Heroku Develop" {
	needs = ["Login Heroku"]
	uses = "actions/heroku@master"
	args = "container:push -a react-chessgame-dev web"
	secrets = ["HEROKU_API_KEY"]
}

action "Release Heroku Develop" {
	needs = "Push Heroku Develop"
	uses = "actions/heroku@master"
	args = "container:release -a react-chessgame-dev web"
	secrets = ["HEROKU_API_KEY"]
}
