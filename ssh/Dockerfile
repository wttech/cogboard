FROM lscr.io/linuxserver/openssh-server

ENV PUBLIC_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICLzgU4PuqFGnQCd5A5Gl30ssE3b9fW7gcyvES4xHHUo mock@openssh-server"
ENV PASSWORD_ACCESS=true
ENV USER_NAME=mock
ENV USER_PASSWORD=TLQuoLMn*T89&Y*r*YqHviSFH6MkR!4E

ADD gen.sh /home/mock/gen.sh
RUN /home/mock/gen.sh 50 > /home/mock/example.txt &&\
    echo '* * * * * /home/mock/gen.sh 10 >> /home/mock/example.txt' > /etc/crontabs/root
CMD /usr/sbin/crond -l 2 -f