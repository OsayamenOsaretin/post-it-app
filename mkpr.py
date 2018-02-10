from os import remove, system
import sys

questions = ['#### What does this PR do?',
             '#### Description of task to be completed?',
             '#### How should this be manually tested?',
             '#### Any background context you want to provide?',
             '#### Screenshots?',
             '#### Questions?',
             '#### What are the relevant pivotal tracker stories?']
answers = ['' for i in range(len(questions))]
options = [option for option in sys.argv]


def getInput(index):
    answer = ''
    while True:
        try:
            line = str(raw_input())
        except NameError:
            line = input()
        if len(line) < 1:
            break
        answer += line + '\n'
    ''.join(answer)
    print(answer)
    answers[index] = answer


def outputPRDescription(question, answers, index, file):
    if len(answers[index]):
        file.write(question + '\n')
        file.write('\n')
        file.write(answers[index])
        file.write('\n')


def continueFromUserEnd():
    try:
        continue_file = open('continue-pr.txt', mode='r+')
        question_index = int(continue_file.readline())
        write_pr(question_index, 'a')
    except IOError:
        print('You were not on a previous operation, run `python mkpr.py` to start one')


def write_pr(index, mode):
    print('\n')
    print('Create your PR description from the terminal')
    print('Ctl-D for unix to end operation')
    print('Ctl-Z+Return for windows to end operation')
    print('\n')
    try:
        pr_file = open('pull-request.txt', mode=mode)
        for question in questions[index:]:
            print(' '.join(question.split(' ')[1:]))
            getInput(index)
            outputPRDescription(question, answers, index, pr_file)
            index += 1
        pr_file.close()
        print('Thank you, find your PR description ready in pull-request.txt \n')
        remove('continue-pr.txt')
    except EOFError:
        continue_file = open('continue-pr.txt', mode='w')
        continue_file.write(str(index))
        continue_file.close()
        print('\n')
        print('You ended the operation, run `python mkpr.py` to start all over')
        print('You can also run `python mkpr.py --continue` to continue from where you stopped')
    except OSError:
        pass


if '--continue' in options:
    continueFromUserEnd()
else:
    index = 0
    write_pr(index, 'w')

if '--create' in options:
    try:
        print('create PR against what branch?')
        branch = raw_input()
    except NameError:
        branch = input()
    description_file = open('pull-request.txt')
    description = ''.join(description_file.readlines())
    description_file.close()
    remove('pull-request.txt')
    try:
        print('Enter the title of the PR:')
        title = raw_input()
    except NameError:
        title = input()
    command_string = 'sudo bash ./mkpr.bash -b {} -t {} -d {}'
    command = command_string.format(branch, title, description)
    system(command)
