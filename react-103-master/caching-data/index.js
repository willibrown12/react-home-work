const cache = {};

async function getCountryDetails(name) {
  const result = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const countriesResult = await result.json();
  console.log("API REQUEST");
  return countriesResult.length;
}
const TIMESTAMP_DIFF = 60000;
async function getDataFromCacheOrApi(name) {
  if (cache[name]) {
    const data = cache[name];
    const now = new Date().getTime();
    console.log(
      new Date(
        new Date(data.timestamp).getTime() + TIMESTAMP_DIFF
      ).toISOString(),
      new Date(now).toISOString()
    );
    if (new Date(data.timestamp).getTime() + TIMESTAMP_DIFF >= now) {
      return cache[data];
    } else {
      cache[name] = {
        data: await getCountryDetails(name),
        timestamp: new Date().toISOString(),
      };
    }
  } else {
    cache[name] = {
      data: await getCountryDetails(name),
      timestamp: new Date().toISOString(),
    };
  }
}

async function init() {
  await getDataFromCacheOrApi("isr");
  await getDataFromCacheOrApi("usa");
  await getDataFromCacheOrApi("united");
  console.log(cache);
  await getDataFromCacheOrApi("united");
  console.log("FINISHED!!");
}
init();
