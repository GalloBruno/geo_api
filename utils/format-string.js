export function formatBrowserInfo(text = '') {
  if (text.includes(')') && text.includes(';')) {
    return text.replace(')', ' ').replace(';', ' ')
  } else {
    return text
  }
}
