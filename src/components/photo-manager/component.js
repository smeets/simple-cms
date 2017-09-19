module.exports = class {
  onInput(input) {
    this.state.selected = input.selected
  }

  onCreate(input) {
    this.state = {
      photos: [],
      loading: false,
      selected: input.selected || [],
      updated: Date.now()
    }
  }

  onMount() {
    this.loadPhotos()
  }

  addPhotos(newPhotos) {
    this.state.photos = this.state.photos.concat(newPhotos)
  }

  loadPhotos() {
    this.state.loading = true
    fetch('/api/photo', {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        this.state.loading = false
        this.state.photos = res.data
      })
      .catch(err => {
        this.state.loading = false
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