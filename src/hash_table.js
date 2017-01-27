class HashTable {
  constructor(obj) {
    this.length = 0;
    this.items = {};
  }

  hasOwnProperty() {
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
          this.items[p] = obj[p];
          this.length++;
      }
    }
  }


  setItem(key, value){
      let previous = undefined;
      if (this.hasItem(key)) {
          previous = this.items[key];
      }
      else {
          this.length++;
      }
      this.items[key] = value;
      return previous;
  }

  getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        let keys = [];
        for (let k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        let values = [];
        for (let k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}
        