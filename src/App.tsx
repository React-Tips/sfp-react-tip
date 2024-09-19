import { useEffect, useState } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react';
import TableCustom from "./Components/TableCustom";
import tree from "./assets/tree.png";
import message from './assets/message.png';
import './App.css';
import { dataHeaderType, dataTableType } from './Components/interfaces.interface';

function App() {
  const [dataTable, setDataTable] = useState<dataTableType[]>([]);
  const [dataHeader, setDataHeader] = useState<dataHeaderType | null>(null);

  const formatNumber = (number: number) =>
    number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/loans.json');
      const { metadata, productListWithAlignment } = await response.json();

      setDataTable(productListWithAlignment);
      setDataHeader(metadata);
    };

    fetchData();
  }, []);

  const renderHeaderPanel = () => {
    if (!dataHeader) return null;

    return (
      <section className="headerPanel">
        <h1>Alignment Overview</h1>
        <div className="headerPanelDetails">
          {Object.entries({
            "Total exposure": dataHeader.grossCarryingAmountTotal,
            "Eligible amount": dataHeader.eligabilityTotal,
            "Aligned amount": dataHeader.alignmentTotal,
          }).map(([label, amount]) => (
            <p key={label}>
              <span style={{ color: '#00cc00' }}>{label}: </span>
              <span>{formatNumber(amount.amount)} {amount.currency}</span>
            </p>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className='App'>
      <section className="appWrapper">
        <nav className='navMenu'>
          <a className="navLogo" href="#">
            <img src={message} alt="logo-image" width={80} />
            <span>SFP</span>
          </a>
          <ul className='navList'>
            {['Home', 'Company', 'Team', 'Contact'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </nav>

        <header>
          <section className="headerContent">
            <div className="headerContentLeft">
              <h1>Sustainable Finance Platform</h1>
              <small>
                We're building a Sustainable Finance Platform that helps banks easily manage ESG data.
                For example, banks need to report how "green" their loans are, like whether a €100M loan
                funds eco-friendly projects or not. Our platform simplifies this process, helping banks meet
                environmental reporting requirements.
              </small>
            </div>
            <div className="headerContentRight">
              <img src={tree} alt="tree-money-image" width={140} />
            </div>
          </section>
          {renderHeaderPanel()}
        </header>
      </section>

      <main>
        <section className="appWrapper">
          <h1 className="mainTitle">Loan Alignment</h1>
          <div className="mainTable">
            <ThemeProvider>
              <TableCustom dataTable={dataTable} formatNumber={formatNumber} />
            </ThemeProvider>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
