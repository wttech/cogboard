# [Home](/cogboard/) >> Setup

## Prerequisites - Installed Docker CE

* Install Docker CE on **Windows 10** - follow instructions [here](https://docs.docker.com/docker-for-windows/install/) and execute required config steps:
  * Make sure that `Hyper-V` is enabled  
  ![windows enable hyper v](./images/docker-windows-hyperv.png)  
  * Log-in to `Docker Desktop` in Windows tray
  * Check `Expose daemon on...` property  
  ![docker expose daemon](./images/docker-windows-config.png)  
  * Share drive where cogboard was cloned  
  ![docker share drive](./images/docker-windows-config2.png)  

* Install Docker CE on **Mac OS** - follow instructions [here](https://docs.docker.com/docker-for-mac/install/)
* Install Docker CE on **Ubuntu Linux** - `sudo apt-get install docker-ce`, more instructions [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

## Endpoints setup
In order to use widgets that communicate with third party software you must first configure endpoints.  
Edit this file `mnt/endpoints.json`.  
Any sensitive data from `endpoints.json` file is never accessible for end-users. Only `id` and `title` can be requested.

## How to run

#### Initialization step 
 
Execute below command once for initial configuration. This step will create required config files.
```cmd
./gradlew cogboardInit
```

#### Run
Use below command to assemble and deploy Cogboard docker app.
```cmd
./gradlew
```

##### When launched go to [http://localhost:8092](http://localhost:8092) to see your board

##### Login to manage boards >> default credentials: `admin` : `admin`