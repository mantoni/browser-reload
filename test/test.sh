while [ true ]; do
  seconds=$RANDOM
  let "seconds %= 4 + 1"
  sleep $seconds
  echo -n '.'
  touch test/index.html
done
