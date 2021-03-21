# How to Collaborate 101

-   Assuming you have write access right to the project repository.

## Install & Setup Git

1. Install Git, please refer to [Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Set up Git
    1. Set up git email
        ```bash
        git config --global user.email "your_github_account_email@xxxxxx.com"
        ```
    2. Set up your name
        - Use your real name, it is not necessary to match your username on GitHub.
        ```bash
        git config --global user.email "First Last"
        ```

## Clone project

Navigate to your desired directory to store code repositories

```bash
cd ~/code # for example
```

clone project

```bash
git clone "https://github.com/MarkHershey/SUTDHousingPortal.git"
```

`cd` into project root

```bash
cd SUTDHousingPortal
```

Now you are at the "Project Root"

```bash
pwd
# it should return ~/code/SUTDHousingPortal
```

## Before you start contributing, Create a new branch

Create a new local branch

```bash
git branch "NEW_BRANCH_NAME"
```

-   Replace "NEW_BRANCH_NAME" to something unique and meaningful
-   You can name your branch after your first name to avoid conflict with others, e.g. mark-dev

Switch to the newly created branch

```bash
git checkout "NEW_BRANCH_NAME"
```

Now you have switch from the "Master" branch to your own branch, you can safely make any edits without messing up anything from "Master" branch.

Lastly, this branch is still on your local machine, you need to push it to GitHub so others can see it too.

Push new branch to remote (GitHub)

```bash
git push -u origin "NEW_BRANCH_NAME"
```

Now your new branch will appear on GitHub too.

## Contribute and Commit changes

Now you are ready to develop new features

make sure you "commit" regularly, so that your progress will not be lost.

"commit" is similar to the "save" button in Microsoft Docs, but there are some subtle differences.

You should save as frequently as possible in Microsoft Docs, but you should not commit too frequently or too rarely.

You should commit once per new feature, or once per new sub-feature. (depends on how you define a feature)

An indication for a good amount of changes in one commit is that you can summarize the changes you made in a short sentence, that is also the "commit message" you need to input when you make the "commit"

Now assuming you have make some changes

You need to stage your changes first!

```bash
git add .
```

Now you can commit those staged changes

```bash
git commit -m "your commit message here"
```

commit message should start with a verb in present tense.

Example one-line commit messages:

-   Fix type in README.md
-   Add method for Auth Handler
-   Update API endpoints
-   Change updateAll() behavior
-   Delete config.py url.py

Now you just need to push your new commits to GitHub

```bash
git push
```

Congratulations! You have successfully make your contribution to the project.

## Create a PR on GitHub

now your new feature is on GitHub for everyone else to see

But it is at a separate branch created by you, your new feature is not on the main/master branch yet.

To make you changes into the main/master branch

you have to create a Pull Request (PR) and get somebody to review your code

Step-by-step:

1. Just go to Github Project page: https://github.com/MarkHershey/SUTDHousingPortal
2. Select your branch from a top-left dropdown menu
3. Click on "Pull request"
4. Click right-side text "Reviewers" and select someone to be the reviewer
5. Click the big green button "Create pull request"
6. Done! Just wait for someone to review your code.

## After some days

You have been making contributions, but very soon you discovered an issue: Master branch has been updated by others, and you are still working on your outdate personal branch that does not contain those new changes made by others. You want to keep up to date with Master branch, what should you do?

Simple, delete your branch then create your branch again from the latest Master branch.

lets go through that step by step:

first, you should only delete your branch if and only if there is no new information on your branch comparing to the master branch, which means that your PRs has been merged into Master branch already.

To delete branch on Github

1. Got to Github Project page: https://github.com/MarkHershey/SUTDHousingPortal
2. Click the text `x branches`
3. Double check that your branch has no commits ahead of master
4. Click delete button for your branch

To delete branch on your local machine

1. lets switch to Master branch first

    ```bash
    git checkout master
    ```

2. delete your branch

    ```bash
    git branch -d "YOUR_BRANCH_NAME"
    ```

Now, you want to get the latest updates for Master branch

Simply

```bash
git pull
```

Now, you are clean and up-to-date, you can repeat the same procedures above to create your branch again.
