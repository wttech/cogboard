# [Home](/cogboard/) >> Development

The definition of done (DoD) is when all conditions, or acceptance criteria, that a software product must satisfy are met and ready to be accepted by a user, customer, team, or consuming system. [more](https://www.leadingagile.com/2017/02/definition-of-done/)

## Our Definition Of Done is: 

    * all feature or bug requirements are met
    * application is building correctly (detekt, prettier has no issues)
    * dev has tested his feature or bug
    * dev created pull request to master branch
    * pull request has at least 2 approvals
    * Travis also approves pull request (if present)
    * (optional) QA Hug
    * QA tested and accepted feature or bug
    * accepted feature or bug is merging to master
    * after merge Travis will try to build, deploy and test app on test environment
    * if tests are green new Docker image is pushed to Docker Hub
    * dev should delete feature branch from repository
