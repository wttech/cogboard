# [Home](/cogboard/) >> Config backup

Configuration persistence is achieved with [Docker Volume](https://docs.docker.com/storage/volumes/) feature.  
* Config is stored under `<project_root>/mnt/config.json`.  
* Config can be backed-up or even versioned with git - in order to backup `config.json` make a git repository from `mnt` folder and backup it like any other file in a project.

#### `config.json` will be persistent even after new docker container was created.
#### No automatic feature for backup config is currently implemented.