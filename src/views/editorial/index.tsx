import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { EditorialService } from '../../services';
import { EditorialModel, RequestPagination, ResponsePagination } from '../../types';

const index = (): JSX.Element => {
	// Attributes
	const [dataEditorial, setDataEditorial] = useState<ResponsePagination<EditorialModel>>();
	const [editoriales, setEditoriales] = useState<EditorialModel[]>([]);

	// Hooks
	useEffect(() => {
		console.log('useEffect');
		// void findAllEditoriales();
		void paginatedSerachEditoriales();
	}, []);

	// Methods
	const findAllEditoriales = async (): Promise<void> => {
		const response = await EditorialService.findAll();
		const data: EditorialModel[] = response.data;

		console.log('Editoriales', data);

		setEditoriales(data);
	};

	const paginatedSerachEditoriales = async (): Promise<void> => {
		const searchFilter: RequestPagination<EditorialModel> = {
			page: 2,
			perPage: 10,
		};
		const response = await EditorialService.paginatedSearch(searchFilter);
		const data: ResponsePagination<EditorialModel> = response.data;

		console.log('busqueda pagianda', data);

		setDataEditorial(data);
	};

	return (
		<>
			<Row className="page-titles">
				<Col className="col-auto">
					<ol className="breadcrumb py-1">
						<li className="breadcrumb-item text-nowrap">Administradores</li>
						<li className="breadcrumb-item text-nowrap active">Editoriales</li>
					</ol>
				</Col>
				<Col className="d-flex justify-content-end align-items-center">
					<div>
						<Button variant="primary" size="sm">
							Primary
						</Button>{' '}
						<Button variant="secondary" size="sm">
							Secondary
						</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de editoriales</Card.Header>
						<Card.Body>{JSON.stringify(dataEditorial)}</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
