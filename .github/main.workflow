workflow "Build and Test on push" {
	on = "push"
	resolves = [
		"Docker build",
		"Release Heroku Production",
		"Release Heroku Develop",
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

action "Is Branch" {
	uses = "actions/bin/filter@master"
	needs = ["Docker build"]
	args = "branch"
}

action "Login Heroku" {
	uses = "actions/heroku@master"
	needs = ["Is Branch"]
	args = "container:login"
	secrets = ["HEROKU_API_KEY"]
}

# Currently there is no abilty to do this

# action "Filter Production" {
# 	uses = "actions/bin/filter@master"
# 	needs = ["Login Heroku"]
# 	args = "branch master"
# }

# action "Push Heroku Production" {
# 	uses = "actions/heroku@master"
# 	needs = ["Filter Production"]
# 	args = "container:push -a react-chessgame web"
# 	secrets = ["HEROKU_API_KEY"]
# }

# action "Release Heroku Production" {
# 	uses = "actions/heroku@master"
# 	needs = ["Push Heroku Production"]
# 	args = "container:release -a react-chessgame web"
# 	secrets = ["HEROKU_API_KEY"]
# }

action "Filter Develop" {
	uses = "actions/bin/filter@master"
	needs = ["Login Heroku"]
	args = "branch develop"
}

action "Push Heroku Develop" {
	uses = "actions/heroku@master"
	needs = ["Login Heroku", "Filter Develop"]
	args = "container:push -a react-chessgame-dev web"
	secrets = ["HEROKU_API_KEY"]
}

action "Release Heroku Develop" {
	uses = "actions/heroku@master"
	needs = "Push Heroku Develop"
	args = "container:release -a react-chessgame-dev web"
	secrets = ["HEROKU_API_KEY"]
}
