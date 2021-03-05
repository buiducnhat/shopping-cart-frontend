const beautifyCategoryName = (categoryName) => {
    let words = categoryName.split('_')
    words = words.map(word => word.replace(word.charAt(0), word.charAt(0).toUpperCase()))
    return words.join(' ')
}

export default beautifyCategoryName