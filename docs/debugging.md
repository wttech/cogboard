# [Home](/cogboard/) >> Debugging

#### Normal debugging
Uncomment line in `./docker/Dockerfile`
```dockerfile
RUN sed -i 's/# JVM_DEBUG=/JVM_DEBUG=/g' /usr/local/knotx/bin/knotx
```
Uncomment debug port in `./cogboard-local-compose.yml`
```yaml
    - "18092:18092"
```

#### Startup debugging - use this when debugging `start()` methods
Uncomment line in `./docker/Dockerfile`
```dockerfile
RUN sed -i 's/suspend=n/suspend=y/g' /usr/local/knotx/bin/knotx
```


**IMPORTANT !** - Make sure that `CMD [ "knotx", "run-knotx" ]` is a last command in `./docker/Dockerfile`