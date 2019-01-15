workflow "Production Build and Deploy" {
	on = "push"
	resolves = [
		"Release Heroku Production"
	]
}

action "Filter Production" {
	uses = "actions/bin/filter@master"
	args = "branch master"
}

action "Install Dependencies" {
	needs = ["Filter Production"]
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

action "Login Heroku" {
	needs = ["Docker build"]
	uses = "actions/heroku@master"
	args = "container:login"
	secrets = ["HEROKU_API_KEY"]
}

action "Push Heroku Production" {
	needs = ["Filter Production"]
	uses = "actions/heroku@master"
	args = "container:push -a react-chessgame web"
	secrets = ["HEROKU_API_KEY"]
}

action "Release Heroku Production" {
	needs = ["Push Heroku Production"]
	uses = "actions/heroku@master"
	args = "container:release -a react-chessgame web"
	secrets = ["HEROKU_API_KEY"]
}
