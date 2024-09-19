class Post {
    constructor(title, image) {
        this.title = title
        this.image = image

    }

    validate() {
        const errors = {}
        if (!this.title.trim()) {
            errors.title = 'Title cannot be empty'
        }

        const allowedMimeTypes = new Set(['image/png', 'image/jpeg'])
        if (!this.image) {
            errors.image = 'Image is required'
            console.log(errors);
            
        } else if (!allowedMimeTypes.has(this.image.type)) {
            errors.image = 'Invalid image type. Only PNG or JPG is allowed'
            console.log(errors);
        }
        return errors
    }

    toFormData() {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('postImg', this.image, 'postImg.png')
        return formData
    }
}

export default Post
