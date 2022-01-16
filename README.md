# Tracking number updater
This project updates traking numbers and saves them to Firebase db.
## Main features
There is another frontend `React` project that uses these updates to work on parcels' statistics.
### How it works
There are tracking numbers list in Firebase db. They can be added to Firebase with that frontend `React` project<br/>
That list is retrived from Firebase, than by means of api from [gdeposylka.ru](https://gdeposylka.ru/) we receive update on movements of the parcels and save them back into Firebase. 
23#aM!48