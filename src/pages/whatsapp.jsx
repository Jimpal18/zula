import React from "react"

const WhatsAppButton = () => {
  const phoneNumber = "919876543210" 
  const message = "Hello! I have a query about your products."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-15 right-2 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110"
      title="Chat with us on WhatsApp"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.61 5.99L0 24l6.17-1.61A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zm-8.52 18a9.89 9.89 0 01-5.3-1.55l-.38-.23-3.67.96.98-3.58-.24-.37A9.91 9.91 0 1121.99 12c0 5.52-4.48 10-10 10zm5.47-7.36c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07a8.01 8.01 0 01-2.35-1.45 8.3 8.3 0 01-1.53-1.91c-.17-.3 0-.46.13-.61.14-.15.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.57-.5-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.11 3.22 5.1 4.52.71.3 1.26.48 1.7.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.1-.26-.15-.57-.3z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
