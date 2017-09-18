module.exports = class {
  onInput(input) {
    this.state.selected = input.selected
  }

  onCreate(input) {
    this.state = {
      photos: [],
      selected: input.selected || [],
      updated: Date.now()
    }
  }

  onMount() {
    this.loadPhotos()
  }

  loadPhotos() {
    fetch('/api/photo')
      .then(res => res.json())
      .then(res => {
        this.state.photos = res.data
      })
  }

  onPhotoChange(photo) {
    var idx = this.state.selected.indexOf(photo)

    if (idx >= 0)
      this.state.selected.splice(idx, 1)
    else
      this.state.selected.push(photo)

    this.emit('change', this.state.selected)
  }
}