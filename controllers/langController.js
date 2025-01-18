export function changeLocale(req, res, next) {
    const locale = req.params.locale

    res.cookie('nodeapp-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    res.redirect('back')
}