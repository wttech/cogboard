FROM knotx/knotx:$knotx_version

LABEL maintainer="CogBoard Project"

COPY ./out/knotx /usr/local/knotx

RUN sed -i 's/# JVM_DEBUG=/JVM_DEBUG=/g' /usr/local/knotx/bin/knotx
# RUN sed -i 's/suspend=n/suspend=y/g' /usr/local/knotx/bin/knotx

CMD [ "knotx", "run-knotx" ]