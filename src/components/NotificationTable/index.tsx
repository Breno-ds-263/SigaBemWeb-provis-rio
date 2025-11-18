import "./style.css"
import Button from "../TabbleButton"

export default function NotificationTable(){
    return(
    <section className="table-section">
      <div id="feedbackTable">
        <table>
          <thead>
            <tr>
              <th>
                <Button label="Feedbacks" onClick={() => {}} type="primary" />
                <Button label="Notificações" onClick={() => {}} type="secondary" />
              </th>
              <th>Linha</th>
              <th>Data</th>
              <th>Deficiência</th>
              <th>Gênero</th>
              <th>Descrição</th>
              <th>Demanda</th>
            </tr>
          </thead>
          <tbody id="tabela-corpo"></tbody>
        </table>
      </div>

      <div id="notificationsTable" style={{display: "none"}}>
        <table>
          <thead>
            <tr>
              <th>
                <button className="btn primary show-feedbacks">Feedbacks</button>
                <button className="btn secondary show-notifications">Notificações</button>
              </th>
              <th>Título</th>
              <th>Mensagem</th>
              <th>Tipo</th>
              <th>Linhas</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody id="notificacoes-corpo"></tbody>
        </table>
      </div>
    </section>
    )
}