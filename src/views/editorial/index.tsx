import { useEffect } from 'react';
import { EditorialService } from '../../services';
import { EditorialModel } from '../../types';

const index = (): JSX.Element => {
	// Attributes

	// Hooks
	useEffect(() => {
		console.log('useEffect');
		void findAllEditoriales();
	}, []);

	// Methods
	const findAllEditoriales = async (): Promise<void> => {
		const response = await EditorialService.findAll();
		const data: EditorialModel[] = response.data;

		console.log('Editoriales', data);
	};

	return <div>Editorial</div>;
};

export default index;
