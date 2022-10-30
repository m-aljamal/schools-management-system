import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamService } from 'src/exam/exam.service';
import { StudentService } from 'src/student/student.service';
import { SubjectService } from 'src/subject/subject.service';
import { Repository } from 'typeorm';
import { GradeInput } from './dto/grade.input';
import { Grade } from './entity/grade';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService,
    private readonly examService: ExamService,
  ) {}

  async findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async seedGrade(grade: GradeInput) {
    const students = await this.studentService.findAll({
      archiveId: '7c005db8-090b-4ccd-b6b8-3cc3aa98c3e9',
    });
    const exams = await this.examService.findExamsByArchiveId(
      '7c005db8-090b-4ccd-b6b8-3cc3aa98c3e9',
    );

    for (const student of students) {
      const subject = await this.subjectService.findAll(student.levels[0].id);
      for (const sub of subject) {
        const final_grade = Math.floor(Math.random() * 100);
        let passTheExam = false;
        if (final_grade > 50) {
          passTheExam = true;
        }
        const newGrade = this.gradeRepository.create({
          subjectId: sub.id,
          examId: exams.find((exam) => exam.levelId === student.levels[0].id)
            .id,
          studentId: student.id,
          semesterId: 'caa1da3c-dc0e-4d1a-95db-b309c23b4378',
          final_grade,
          first_quiz_grade: Math.floor(Math.random() * 100),
          homework_grade: Math.floor(Math.random() * 100),
          passTheExam,
        });
        console.log(newGrade);
        await this.gradeRepository.save(newGrade);
      }
    }
  }

  async findThePassingGrade() {
    const query = this.gradeRepository
      .createQueryBuilder('grade')
      .leftJoinAndSelect('grade.student', 'student')
      .where('grade.passTheExam = :passTheExam', { passTheExam: true });
    query.leftJoinAndSelect('grade.subject', 'subject');
    query.leftJoinAndSelect('grade.exam', 'exam');
    query.leftJoinAndSelect('grade.semester', 'semester');
    query.leftJoinAndSelect('student.levels', 'level');

    return query.getMany();
  }

  async createGrade(grade: GradeInput): Promise<Grade> {
    let passTheExam = false;
    if (grade.final_grade > 50) {
      passTheExam = true;
    }
    const newGrade = this.gradeRepository.create({
      ...grade,
      passTheExam,
    });
    return this.gradeRepository.save(newGrade);
  }
}
