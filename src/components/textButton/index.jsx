import "./styles.css"

export default function TextButton({
  children,
  text,
  onClick,
  size = 16,
  weight,
}) {
  return (
    <span
      className="text-button"
      onClick={onClick}
      style={{ fontSize: size, fontWeight: weight }}
    >
      {children}
    </span>
  )
}
