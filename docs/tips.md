# [Home](/cogboard/) >> Tips & Tricks

#### 1. Error while deploying Cogboard container
If You see similar error while deploying Cogboard:
```bash
Failed to deploy 'cogboard Image id: cogboard/cogboard-app': com.github.dockerjava.api.exception.InternalServerErrorException: {"message":"error while creating mount source path '/host_mnt/c/Users/user.name/.workspace/cogboard/mnt': mkdir /host_mnt/c: file exists"
```
If you recently changed your AD password. 
##### Try to restart `Docker Desktop` so it will ask You for AD credentials to access local filesystem.

 ----

#### 2.

 ----