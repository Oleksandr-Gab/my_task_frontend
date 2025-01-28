export default function LabelColor() {
  return (
    <label>
      Priority:
      <div>
        <label>
          <input
            type="radio"
            value="Low"
            checked={cardPriority === 'Low'}
            onChange={e => setCardPriority(e.target.value)}
          />
          <span className={css.radioLabel} style={{ color: '#E09CB5' }}>
            Low
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            checked={cardPriority === 'Medium'}
            onChange={e => setCardPriority(e.target.value)}
          />
          <span className={css.radioLabel} style={{ color: '#BEDBB0' }}>
            Medium
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="High"
            checked={cardPriority === 'High'}
            onChange={e => setCardPriority(e.target.value)}
          />
          <span className={css.radioLabel} style={{ color: '#8FA1D0' }}>
            High
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="Without"
            checked={cardPriority === 'Without'}
            onChange={e => setCardPriority(e.target.value)}
          />
          <span className={css.radioLabel} style={{ color: '#000000' }}>
            Without
          </span>
        </label>
      </div>
    </label>
  );
}
