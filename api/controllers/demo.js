import db from "diskdb";

export const getDemoData = urlParams => {
  db.connect("../data", ["demo"]);
  return db.demo.find(urlParams);
};

export const addDemoData = request => {
  db.connect("../data", ["demo"]);

  const requestItems = Object.entries(request);
  const data = {};

  requestItems.forEach(item => {
    // if the request item key exists in the ALLOWED_DATA array, save it
    if (process.env.ALLOWED_DATA.includes(item[0])) {
      data[item[0]] = item[1];
    }
  });

  db.demo.save(data);
  return data;
};
