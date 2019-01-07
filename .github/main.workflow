workflow "Build and Test on push" {
  on = "push"
  resolves = ["Build Project", "Fliter Master"]
}

action "Lint Code" {
  uses = "actions/npm@e7aaefe"
  args = "run lint"
}

action "Build Project" {
  uses = "actions/npm@e7aaefe"
  needs = ["Lint Code"]
  args = "run build"
}

action "Fliter Master" {
  needs = "Build Project"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

// TODO: Deploy to Github Pages
