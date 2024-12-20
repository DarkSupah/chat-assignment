export const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}$/

export const IPV4_REGEX = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/

export const HOST_REGEX = new RegExp(`${URL_REGEX.source}|${IPV4_REGEX.source}`)
