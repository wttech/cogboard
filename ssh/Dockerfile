FROM lscr.io/linuxserver/openssh-server

ENV PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCuNrl6m54JiRbCtqQEQlzB3Lzaj4wzNirMvxJy9lRBePNd1Asqob6kTY2DwKV2n79f4A8vmpz+Q/MMkljFSEARX/H9qP/KfZx1OPNFzxx69LVQJZQCsLwabVHrKqGFu+wfzWWA1pBgTo7EiIsTkMP/RSqZpt4fO8F06viUMguTeSM40JaG8oC2jnOMSL0ZHB8Ng/YirGu4L04JjgjW0k23SAO8v4IJPOku5l4lXLqJYkAVkZwgrD9mzy1MbtuOiNZcMkLW9PPY17MYRrLZyu1rQb9hnZqT2Q4Y0dxYG5PDbfHhipeNr6gDRalfzztw3KBMVNflD8rNcGN3ibw2u4XSmF3yIpLcvo195mYeg6nVmj6OTgdGuy5Jkafe5EzrEhFMm2Fgj7feKKztzhpDK2r+HStSN3BRISmknF/QWMmWRXiIIrWxeVPqUoJsSLPhQQq0++e8IZ9P9Q9g2etsu2nL3jHIB9JbM+WbkapvTs2Z7k7h3m/Tl/dENcKlrkIlgHs="
ENV PASSWORD_ACCESS=true
ENV USER_NAME=mock
ENV USER_PASSWORD=TLQuoLMn*T89&Y*r*YqHviSFH6MkR!4E

ADD gen.sh /home/mock/gen.sh
RUN chmod +x /home/mock/gen.sh && /home/mock/gen.sh 50 > /home/mock/example.txt &&\
    echo '* * * * * /home/mock/gen.sh 10 >> /home/mock/example.txt' > /etc/crontabs/root
CMD /usr/sbin/crond -l 2 -f