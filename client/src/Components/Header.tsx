import Button from './Button';

type headerProps = {
	onToggleShow: () => void;
	showadd: boolean;
};

const Header = ({ onToggleShow, showadd }: headerProps) => {
	return (
		<div className="header">
			<h1>Task-Tracker</h1>
			<Button
				color={showadd ? 'red' : 'green'}
				text={showadd ? 'Close' : 'Add'}
				onToggle={onToggleShow}
			></Button>
		</div>
	);
};

export default Header;
