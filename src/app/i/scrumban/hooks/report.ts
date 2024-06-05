import { IUser } from '@/types/auth.types'
import { ISprintResponse } from '@/types/sprint.types'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';





const formatDate = (isoString: string) => {
	const date = new Date(isoString);
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
};


export function generateAndDownloadDocx( {item, users} : {item:ISprintResponse, users: IUser[]}) {

	const totalTasks = item.list.reduce((taskCount, list) => {
		return taskCount + list.cards.length;
	}, 0);
	
	const completedTasks = item.list.find(list => list.type === 'done')!.cards.length
	
	
	const userNames = users.map(user => user.name ? user.name : user.email).join(', ')
	
	const unstarted = item.list.find(list => list.type === 'to_do' )?.cards.map(card => card.name).join(', ')
	
	const uncompleted = item.list.find(list => list.type === 'in_progress' )?.cards.map(card => card.name).join(', ')
	
	const blocked = item.list.find(list => list.type === ('blocked'))?.cards.map(card => card.name).join(', ')
	
	const feedback = item.list.find(list => list.type === ('feedback'))?.cards.map(card => card.name ).join(', ')

	const doc = new Document({
		sections: [
			{
				properties: {},
				children: [
					new Paragraph({
						text: `Отчет по спринту: ${item.name}`,
						heading: HeadingLevel.HEADING_1,
						alignment: AlignmentType.CENTER,
					}),
					new Paragraph({
						children: [
							new TextRun(""),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Дата начала спринта: `),
							new TextRun({
								text: `${formatDate(item.startDate!)}`,
								bold: true,
							}),
						],
						
					}),
					new Paragraph({
						children: [
							new TextRun(`Дата окончания спринта: `),
							new TextRun({
								text: `${formatDate(item.endDate!)}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(""),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Общее количество задач: `),
							new TextRun({
								text: `${totalTasks}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Количество выполненных задач: `),
							new TextRun({
								text: `${completedTasks}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Количество невыполненных задач: `),
							new TextRun({
								text: `${totalTasks - completedTasks}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Неначатые задачи: `),
							new TextRun({
								text: `${unstarted ? unstarted : ''}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Невыполненные задачи: `),
							new TextRun({
								text: `${uncompleted ? uncompleted : ''}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Заблокированные задачи: `),
							new TextRun({
								text: `${blocked ? blocked : ''}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Задачи на пересмотрение: `),
							new TextRun({
								text: `${feedback ? feedback : ''}`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(""),
						],
					}),
					new Paragraph({
						children: [
							new TextRun(`Участники спринта: `),
							new TextRun({
								text: `${userNames}`,
								bold: true,
							}),
						],
					}),
				],
			},
		],
	});

	// Создаем blob объект
	Packer.toBlob(doc).then(blob => {
		// Создаем ссылку для скачивания
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = `Отчет по спринту ${item.name ? item.name : ''}.docx`;
		
		// Эмулируем клик по ссылке для инициирования скачивания
		downloadLink.click();

		// Удаляем ссылку после скачивания
		URL.revokeObjectURL(url);
	});
}