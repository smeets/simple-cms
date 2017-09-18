module.exports = class {
  onCreate() {
    this.state = {
      galleries: [],
      active: "",
      hidden: {
        selected: []
      },
      updated: Date.now()
    }
  }

  onMount() {
    this.loadGalleries()
  }

  loadGalleries() {
    fetch('/api/gallery', {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        var galleries = res.data.map(name => {
          return {
            name: name,
            photos: []
          }
        })
        this.state.galleries = galleries
        this.state.galleries.forEach(gallery => this.loadGallery(gallery))
      })
  }

  loadGallery(gallery) {
    fetch(`/api/gallery/${gallery.name}`, {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        gallery.photos = res.photos
        this.state.updated = Date.now()
      })
  }

  findGallery(name) {
    for (var i = 0; i < this.state.galleries.length; i++)
      if (this.state.galleries[i].name === name)
        return this.state.galleries[i]
    return undefined
  }

  updateSelection(gallery) {
    this.state.hidden.selected = []

    if (gallery)
      for (var i = 0; i < gallery.photos.length; i++)
        this.state.hidden.selected.push(gallery.photos[i])
  }

  updateGallery(name) {
    this.state.active = name
    this.updateSelection(this.findGallery(name))
    this.state.updated = Date.now()
  }

  updateGalleryCommit() {
    var gallery = this.findGallery(this.state.active)
    var selection = this.state.hidden.selected

    var added = selection.filter(uuid => gallery.photos.indexOf(uuid) === -1)
    var removed = gallery.photos.filter(uuid => selection.indexOf(uuid) === -1)
    var promises = []

    if (added.length > 0)
      promises.push(fetch(`/api/gallery/${gallery.name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: added })
      }))

    if (removed.length > 0)
      promises.push(fetch(`/api/gallery/${gallery.name}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: removed })
      }))

    this.state.active = ''
    this.state.hidden.selected = []

    Promise.all(promises).then(() => this.loadGallery(gallery))
  }

  updateGalleryCancel() {
    this.state.active = ''
  }
}