const themes = {
  prairie: 'prairie',
  desert: 'desert',
  arctic: 'arctic',
  mountain: 'mountain',
  random: function() {
    const lenght = Object.keys(this).length - 1
    const random = Math.floor(Math.random() * Object.keys(this).length)
    const key = Object.keys(this)[random]
    const map = this[key]
    return map
  }
};

export default themes;
