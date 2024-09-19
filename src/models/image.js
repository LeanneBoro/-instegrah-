class Image {
    constructor(file) {
      this.file = file
    }
  
    validate() {
      const errors = {}
      if (!this.file) {
        errors.file = 'File is required'
      } else if (!['image/png', 'image/jpeg'].includes(this.file.type)) {
        errors.file = 'Invalid file type. Only PNG and JPEG are allowed'
      }
      return errors
    }
  
    toFormData() {
      const formData = new FormData()
      formData.append('image', this.file, this.file.name)
      return formData
    }
  }
  
  export default Image
  