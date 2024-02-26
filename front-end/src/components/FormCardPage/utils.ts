export const handleClearValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.currentTarget.setCustomValidity("");
}
