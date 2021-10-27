#!/bin/bash
labels=(DEBUG INFO WARNING ERROR)
words=(Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet massa sit amet mi feugiat lobortis. Morbi ultrices hendrerit luctus. Donec fermentum viverra viverra. Integer convallis sapien sit amet facilisis pretium. Ut quis commodo odio, ac bibendum urna. Ut imperdiet ante sed ex sollicitudin auctor. Nulla vel eros sit amet velit vulputate suscipit a malesuada felis. Curabitur commodo, erat eget condimentum tristique, ante diam porttitor nulla, condimentum vulputate nibh ex sit amet velit. Vestibulum vel lectus bibendum, pellentesque nisl id, vehicula tellus. Suspendisse sem turpis, dignissim quis aliquet nec, laoreet sit amet urna. Nulla non euismod tellus, id varius)

COUNT=5
if ! [ -z "$1" ]; then
    COUNT=$1
fi

for run in $( seq 1 $COUNT ); do
    d=$(date +%Y-%m-%d:%H:%M:%S)
    l=${labels[$(($RANDOM%4))]}
    w=()
    wCount=$(($RANDOM%5+5))
    for (( i=0; i<$wCount; i++ ))
    do
            w[i]=${words[$(($RANDOM%${#words[@]}))]}
    done
    echo $d "*"${l}"* [FelixStartLevel] " ${w[*]}
done