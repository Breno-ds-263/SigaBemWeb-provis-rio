



export default function Header(){

  return(
    <div className = "flex flex-row bg-neutral-900">
    <a>Sigabem</a>
        <nav>
            <a href="/sigabem/home">Home</a>
            <a href="/sigabem/linhas">Linhas</a>
            <a href="/sigabem/notifications">Notificações</a>
            <a href="/sigabem/administrators">Administração</a>
        </nav>
    </div>
  )

}