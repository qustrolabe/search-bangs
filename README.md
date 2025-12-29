Fork of [unduck](https://github.com/T3-Content/unduck). Instead of using
ServiceWorker to cache HTML page this version does query logic and redirect
inside SW (Should be slightly faster).

You can add `https://qustrolabe.github.io/search-bangs/?q=%s` string to your
browser as alternative search engine and then all queries will be processed
handling bangs and doing redirects.

For example query `cat !gi` would open google image search for cat images,
`hello !gpt` would open chat with gpt with `hello` message typed in waiting for
send confirmation.
