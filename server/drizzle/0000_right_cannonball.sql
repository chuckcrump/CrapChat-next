CREATE TABLE `messages` (
	`uuid` text PRIMARY KEY NOT NULL,
	`convo_id` text,
	`role` text NOT NULL,
	`content` text,
	`user` integer,
	FOREIGN KEY (`convo_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
