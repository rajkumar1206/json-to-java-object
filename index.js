const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
}

const parseObj = {
  "keys": [
    {
      "key2": "data1",
      "key3": 123,
      "key12": {
        "key13": "key89",
        "key16": {
          "key17": 123,
          "key18": "good"
        }
      }
    },
    {
      "key2": "data2",
      "key3": 456
    }
  ],
  "key4": {
    "key5": "data3"
  },
  "key6": {
    "key7": {
      "key8": "data5"
    }
  }
};

const res = [];

const createJavaStub = (data, keyValue = "MainObj", init = false) => {
  if (typeof data !== 'object') {
    return;
  }

  if (typeof data === 'object' && Array.isArray(data) && data.length !== null) {
    data.forEach((obj, ind) => {
      res.push(`${capitalize(keyValue.substring(0, keyValue.length - 1))} ${keyValue.substring(0, keyValue.length - 1)}${ind + 1} = new ${capitalize(keyValue.substring(0, keyValue.length - 1))}();`);
      createJavaStub(obj, `${keyValue.substring(0, keyValue.length - 1)}${ind + 1}`);
      res.push(`${keyValue}.add(${keyValue.substring(0, keyValue.length - 1)}${ind + 1});`);
    });
  } else if (typeof data === 'object') {
    if (init) res.push(`${capitalize(keyValue)} ${keyValue} = new ${capitalize(keyValue)}();`);
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        res.push(`${keyValue}.set${key}("${data[key]}");`);
      } else if (typeof data[key] === 'number') {
        res.push(`${keyValue}.set${key}(${data[key]});`);
      } else {
        res.push(`${capitalize(key)} ${key} = new ${capitalize(key)}();`);
        createJavaStub(data[key], key);
        res.push(`${keyValue}.set${capitalize(key)}(${key});`);
      }
    });
  }
}

const btn= document.getElementById('btn');
const code= document.getElementById('code');
const json= document.getElementById('json');
const objectName = document.getElementById('objectName');
btn.addEventListener('click', () => {
  const data = json.value;
  console.log(data.toString());
  console.log(JSON.parse(json.value));
  createJavaStub(json.value && json.value.length ? JSON.parse(json.value) : parseObj, objectName.value,true);
  code.innerHTML = res.join("\r\n");
  console.log(res);
})
