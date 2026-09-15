interface Row {
  locale: string;
  factKey: string;
  value: string;
}

interface Props {
  rows: Row[];
}

export function LocaleBindingParity({ rows }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Locale</th>
          <th>Fact key</th>
          <th>Bound value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={`${r.locale}-${r.factKey}`}>
            <td className="mono">{r.locale}</td>
            <td className="mono">{r.factKey}</td>
            <td>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
