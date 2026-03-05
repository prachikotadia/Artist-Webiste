URLS=(
"https://images.unsplash.com/photo-1541961017774-22349e4a1262"
"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"
"https://images.unsplash.com/photo-1513364776144-60967b0f800f"
"https://images.unsplash.com/photo-1536924940846-227afb31e2a5"
"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119"
"https://images.unsplash.com/photo-1578301978693-85fa9c026f33"
"https://images.unsplash.com/photo-1580136608260-4ebf15facdaf"
"https://images.unsplash.com/photo-1549887552-cb1071d3e5ca"
"https://images.unsplash.com/photo-1550684848-fac1c5b4e853"
"https://images.unsplash.com/photo-1552250575-e508473b090f"
"https://images.unsplash.com/photo-1563089145-599997674d42"
"https://images.unsplash.com/photo-1557672172-298e090bd0f1"
"https://images.unsplash.com/photo-1501472312651-726afe119ff1"
"https://images.unsplash.com/photo-1518640467707-6811f4a6ab73"
"https://images.unsplash.com/photo-1563604068305-64906f2b703e"
)

for URL in "${URLS[@]}"; do
  STATUS=$(curl -s -o /dev/null -I -w "%{http_code}" "$URL")
  echo "$STATUS $URL"
done
