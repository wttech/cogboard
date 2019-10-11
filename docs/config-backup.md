# [Home](/cogboard/) >> Config backup

Configuration persistence is achieved with [Docker Volume](https://docs.docker.com/storage/volumes/) feature.  
* Config files are stored under `<project_root>/mnt/` folder.  
* `mnt` folder contains:  
  * `config.json` - in this file setup of boards and widgets is held
  * `endpoints.json` - in this file setup of endpoints and credentials is held
* In order to backup files copy files from `mnt` folder somewhere safe.

#### All files in `mnt` folder will be persistent even after new docker container was created.