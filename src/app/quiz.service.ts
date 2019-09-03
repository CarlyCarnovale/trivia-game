import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private router: Router) {}

  score: number = 0;
  username: string;

  getQuestions(): Observable<any> {
    return this.http.get("http://localhost:9090/questions");
  }

  getScores(): Observable<any> {
    return this.http.get("http://localhost:9090/scores");
  }

 postScores(score: number): Observable<any> {
    return this.http.post("http://localhost:9090/scores", score);
  }

  calculateScore(form: object, questions: any, username: string): any {
    this.username = username;

    for (let i=0; i < questions.length; i++) {
      if (form[i] === questions[i].answer) {
        this.score++;
      }
    }
    console.log(this.score);
    this.router.navigate(["results"]);
  }
}
