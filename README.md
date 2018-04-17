# mno.hu archive

On April 10, 2018 at aproximately 10AM GMT+1, mno.hu published the unfortunate news that www.mno.hu together with its print paper, 
Magyar Nemzet, will sunset and cease existance after the last publication day on April 11, 2018 (Source: [1](http://nepszava.hu/cikk/1157215-megszunik-a-magyar-nemzet), 
[2](https://www.politico.eu/article/hungary-opposition-newspaper-magyar-nemzet-to-shut/), [3](https://www.reuters.com/article/us-hungary-election-media/major-hungarian-opposition-newspaper-to-close-after-orban-victory-idUSKBN1HH10S)). 
Although, the official reason being communicated is that they were financially unprofitable to operate any longer, the news break 
days after the 2018 Parliamental Elections in Hungary that was won been won by FIDESZ with 49,23% of total votes, but with 67,34% of seats 
(2/3 + 1) in the National Assembly, thus making Mr. Viktor Orbán and his party to continue to run the country for the 3rd consecutive term 
for the next 4 years (Sources: [1](http://valasztas.hu/dyn/pv18/szavossz/hu/orszlist.html), [2](http://valasztas.hu/dyn/pv18/szavossz/hu/l50.html)). 
This happened after an intense period of hate-driven, anti-immigrant and anti-Soros campaign period, where multiple opposition parties tried
to run against them, but haven't managed to achieve much without joining forces (Sources: [1](https://www.hrw.org/news/2017/09/29/hungary-begins-new-official-hate-campaign), 
[2](https://www.theguardian.com/world/2018/apr/06/hungary-viktor-orban-election-migration)). The shut down of Magyar Nemzet, by many is considered
to be the end of independent media and free press, after in 2016 Népszabadság was suddenly shut down by its owner. While Magyar Nemzet has 
been officially reported to cease due to financial reasons by it's current owner Mr. Lajos Simicska, the oligarch and friend-turned-foe of 
Mr. Viktor Orbán, many speculate political pressure behind it. Nonetheless, there are rumors of possible change of ownership with different 
bids being reported on, but after the cease of Népszabadság, no archive was created and/or made available, hence all content lost forever. 
We are not taking chances with this one!

## Motivation

<blockquote class="twitter-tweet" data-lang="en"><p lang="hu" dir="ltr">&quot;szerdán jelenik meg az utolsó szám, és nem tudni, mi lesz az online archívummal.&quot;<br> Twitter népe, akik így értetek a számítógéphez meg a demokrációhoz, lehet, hogy most lenne az ideje lementeni és felhőbe feltolni az mnohu-t, ne járjunk úgy, mint a nolhu-val.</p>&mdash; Molnár László (@lacalaca85) <a href="https://twitter.com/lacalaca85/status/983663616082792448?ref_src=twsrc%5Etfw">April 10, 2018</a></blockquote>

After the above Twitter user came with the idea of archiving the contents of mno.hu before they get lost/deleted or just simply made unavailabel, so I started up this repository.

When asked one of the Magyar Nemzet journalist if they knew if mno.hu will go dark anytime soon, he did end up giving us some hope that we may have some time - but there's no certainty around the host:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Not sure. As far as I was informed, the servers are paid until the end of the year, but probably it will be online later on because Hír TV&#39;s webpage is on these servers too. But it&#39;s not the official answer :)</p>&mdash; Bence Földi (@BenFoldi) <a href="https://twitter.com/BenFoldi/status/984310413796966400?ref_src=twsrc%5Etfw">April 12, 2018</a></blockquote>

## Approach

The idea was to crawl the website for all its pages and jump from reference to reference, until we end up mirroring the website completely. I had no idea how to estimate the size of it, or to get a sitemap of it before jumping right at it, so I made some assumptions:

- Urls won't be more than 7 levels e.g. `mno.hu/data/image/year/month/date/article/type`
- Since the online portal (mno.hu) was started around the end of 2016, there would be aprox. 55,000 articles published (550 days x 100 publication/day)
- If the average file size for a publication (.html) is 50 KB, that would make the size of all .html files around 2.75 GB
- There would be as many images at least as publications (55,000), with the average size of an image being 200 KB; that would make the aprox. overall size for images to be 11 GB
- There are other source to download, like: JavaScript (.js), Stylesheet (.css), XML (.xml) and folders and each file/folder requires 1 HTTP call to GET
- There may be broken links or "HTTP 302 (Moved Permanently)" redirects, that would require more than 1 HTTP calls
- A guesstimated 150,000 HTTP calls, with 1 call taking up ~1 sec., an estimated ~41 hours would be needed to complete the full archiving
- For this, a dedicated server was required with good internet connection and fast I/O operations (SSD with about 25 GB at least). The answer was Amazon Web Services.

1.) An EC2 instance was created with the following configuration: `Ubuntu Server 16.04 LTS (HVM), 100GB SSD Volume Type - ami-43a15f3e 64-bit 1 vCPU and 500MB of memory`
2.) Run the following SSH command: `wget -mkKE -l 7 -t 6 https://mno.hu`

This would start a mirroring of the hostname given (https://mno.hu), go 7 levels deep the most, retry 6 times before giving up on a file and save both an absolute and relative version of the files

As the crawling/mirroring is moving along, I'm monitoring the tail of the log file from the wget process using `tail -f wget-log`. From time to time, I make a commit to this repository along the way.

## Notes on the margin

In retrospect, I would have done things a bit differently, that I only realised a bit too late:

- Get a EC2 instance with a higher network bandwith (would have costed more)
- Don't modify the source code at all and definitely don't safe the source in two formats
- Pushing a git repo all at once with 16GB worth of data spanned across 250k+ files is pushing git and the server to its edge
- Push in batches early and often
- No limit on repo size in GitHub (although they may ask you to compress and eliminate large files), but they don't allow anything above 100MB in one file
- Split the wget log into files of 100MB max instead of ending up with a 200MB txt that cannot be uploaded onto GitHub 

## Attribution

All the intelectual property found in this repository belongs to Magyar Nemzet's parent company, Nemzet Lap- és Könyvkiadó Kft. and its respective owner - whoever that may be at this point, unless stated otherwise.
