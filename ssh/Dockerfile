FROM lscr.io/linuxserver/openssh-server

ENV PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCuNrl6m54JiRbCtqQEQlzB3Lzaj4wzNirMvxJy9lRBePNd1Asqob6kTY2DwKV2n79f4A8vmpz+Q/MMkljFSEARX/H9qP/KfZx1OPNFzxx69LVQJZQCsLwabVHrKqGFu+wfzWWA1pBgTo7EiIsTkMP/RSqZpt4fO8F06viUMguTeSM40JaG8oC2jnOMSL0ZHB8Ng/YirGu4L04JjgjW0k23SAO8v4IJPOku5l4lXLqJYkAVkZwgrD9mzy1MbtuOiNZcMkLW9PPY17MYRrLZyu1rQb9hnZqT2Q4Y0dxYG5PDbfHhipeNr6gDRalfzztw3KBMVNflD8rNcGN3ibw2u4XSmF3yIpLcvo195mYeg6nVmj6OTgdGuy5Jkafe5EzrEhFMm2Fgj7feKKztzhpDK2r+HStSN3BRISmknF/QWMmWRXiIIrWxeVPqUoJsSLPhQQq0++e8IZ9P9Q9g2etsu2nL3jHIB9JbM+WbkapvTs2Z7k7h3m/Tl/dENcKlrkIlgHs="
ENV PASSWORD_ACCESS=true
ENV USER_NAME=mock
ENV USER_PASSWORD=TLQuoLMn*T89&Y*r*YqHviSFH6MkR!4E

RUN mkdir /home/mock
RUN echo $'#!/bin/bash\n\
labels=(DEBUG INFO WARNING ERROR)\n\
words=(Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet massa sit amet mi feugiat lobortis. Morbi ultrices hendrerit luctus. Donec fermentum viverra viverra. Integer convallis sapien sit amet facilisis pretium. Ut quis commodo odio, ac bibendum urna. Ut imperdiet ante sed ex sollicitudin auctor. Nulla vel eros sit amet velit vulputate suscipit a malesuada felis. Curabitur commodo, erat eget condimentum tristique, ante diam porttitor nulla, condimentum vulputate nibh ex sit amet velit. Vestibulum vel lectus bibendum, pellentesque nisl id, vehicula tellus. Suspendisse sem turpis, dignissim quis aliquet nec, laoreet sit amet urna. Nulla non euismod tellus, id varius)\n\
\n\
COUNT=5\n\
if ! [ -z "$1" ]; then\n\
    COUNT=$1\n\
fi\n\
\n\
for run in $( seq 1 $COUNT ); do\n\
    d=$(date +%Y-%m-%d:%H:%M:%S)\n\
    l=${labels[$(($RANDOM%4))]}\n\
    w=()\n\
    wCount=$(($RANDOM%5+5))\n\
    for (( i=0; i<$wCount; i++ ))\n\
    do\n\
            w[i]=${words[$(($RANDOM%${#words[@]}))]}\n\
    done\n\
    echo $d "*"${l}"* [FelixStartLevel] " ${w[*]}\n\
done' > /home/mock/gen.sh
RUN chmod +x /home/mock/gen.sh
RUN /home/mock/gen.sh 50 > /home/mock/example.txt
RUN echo '* * * * * /home/mock/gen.sh 10 >> /home/mock/example.txt' > /etc/crontabs/root
CMD /usr/sbin/crond -l 2 -f