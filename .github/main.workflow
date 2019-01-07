workflow "Build and Test on push" {
  on = "push"
  resolves = ["Build Project", "Fliter Master"]
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

action "Fliter Master" {
  needs = "Build Project"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

// TODO: Deploy to Github Pages
