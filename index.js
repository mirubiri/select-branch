#!/usr/bin/env node
const inquirer = require('inquirer')
const shell = require("shelljs");

const gitBranchOutput = shell.exec('git branch', {silent: true})
const branchStrings = gitBranchOutput.stdout.split('\n').map(branch => branch.slice(2))
const branches = branchStrings.filter(branch => branch !== '')

if (branches.length === 0) {
  console.log('No branches')
  return process.exit(0)
} else if (branches.length === 1) {
  console.log('Only one branch')
  return process.exit(0)
}

inquirer.prompt([
  {
    type: 'list',
    name: 'selection',
    message: 'Which branch do you want to checkout?',
    choices: branches
  }
]).then(choice => {
  let branchSelection = choice.selection
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Checkout ${branchSelection}?`,
      default: true
    }
  ]).then(selection => {
    if (!selection.confirm) {
      return process.exit(0)
    }
    module.exports = shell.exec(`git checkout ${branchSelection}`)
  })
})
